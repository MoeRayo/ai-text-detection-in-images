<template>
  <div class="flex flex-column flex-row-ns pa3 calisto bg-black-05 vh-100">
    <div class="w-50-ns w-100 ph3">
      <!-- upload image -->
      <form enctype="multipart/form-data" v-if="isInitial || isSaving">
        <h2>Upload Image</h2>
        <div class="b--dashed bw1 b--light-purple pa3 hover-bg-black-10 bg-animate pointer relative h4">
          <input type="file" accept="image/*" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" class="input-file absolute w-100 h4 pointer o-0">
          <p  v-if="isInitial" class="tc f4">
            Drag your file here to begin<br> or click to browse
          </p>
          <p v-if="isSaving" class="tc f4">
            Uploading file...
          </p>
        </div>
       
      </form>
      <!--upload successful-->
      <div v-if="isSuccess">
        <h2>File upload is successful.</h2>
        <button @click.prevent="reset()" class="bg-light-purple pa3 mv4 link dim br2 pointer ba b--light-blue dib white">Upload again</button>
        <div v-for="item in uploadedFiles">
          <img :src="item.url" :alt="item.originalName">
        </div>
         <button @click.prevent="detectText" class="bg-light-blue pa3 mv4 link dim br2 pointer ba b--light-blue dib">Extract Text</button>
      </div>
      <!--upload failed-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
          <button @click.prevent="reset()">Try again</button>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
    <section class="w-40-l w-50-m w-100 ph3">
      <h2>Extracted Text</h2>
      <div class="bg-light-blue br3 h-auto pa3 f4 lh-copy">
        {{detectedText}}
      </div>
      <button class="bg-black pa3 mv4 link dim br2 pointer ba b--black dib white" @click="copyText">{{shareText}}</button>
    </section>
  </div>
</template>

<script>
  import { upload } from '~/utils/file-upload.service.js';
  import { wait } from '~/utils/wait.js';
  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      ocr: 'adv_ocr',
      preset: "eupk2nrn",
      cloudName: 'moerayo',
      detectedText: '',
      shareText: 'Copy Text'
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
      upload(formData)
      .then(wait(2000)) //delaying the promise
      .then(x => {
        this.uploadedFiles = [].concat(x);
        this.currentStatus = STATUS_SUCCESS;
      })
      .catch(err => {
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });
      // save it
      this.save(formData);
    },
    prepareFormData() {
      this.newFormData = new FormData();
      this.newFormData.append("upload_preset", this.preset);
      this.newFormData.append("file", this.uploadedFiles[0].url);
    },
    detectText(){
      this.prepareFormData();
      const cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
      const requestObj = {
        url: cloudinaryUploadURL,
        method: "POST",
        data: this.newFormData,
      };
      this.$axios(requestObj)
      .then(response => {
        this.results = response.data;
        const { textAnnotations } = response.data.info.ocr.adv_ocr.data[0]
        const extractedText = textAnnotations.map((anno, i) => i > 0 && anno.description.replace(/[^0-9a-z]/gi, '')).filter((entry) => typeof entry === 'string').join(' ');
          this.detectedText = extractedText
        })
        .catch(error => {
        return error
      })
    },
    copyText(){
      navigator.clipboard
      .writeText(this.detectedText)
      .then(() => (this.shareText = 'Copied!'))
      .catch((err) => err)
    }
  },
  mounted() {
    this.reset();
  },
}
</script>