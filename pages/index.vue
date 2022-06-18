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
        <button @click="reset()" class="bg-light-purple pa3 mv4 link dim br2 pointer ba b--light-blue dib white">Upload again</button>
        <div v-for="item in uploadedFiles">
          <img :src="item.url" :alt="item.originalName">
        </div>
         <button class="bg-light-blue pa3 mv4 link dim br2 pointer ba b--light-blue dib">Extract Text</button>
      </div>
      <!--upload failed-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
          <button @click="reset()">Try again</button>
        <pre>{{ uploadError }}</pre>
      </div>
    </div>
    <section class="w-40-l w-50-m w-100 ph3">
      <h2>Extracted Text</h2>
      <div class="bg-light-blue br3 h-auto pa3 f4 lh-copy">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto nemo nesciunt magni ad hic accusamus debitis cum doloribus laboriosam quod ipsam natus dolorum minima, dolorem rerum praesentium atque? Deserunt?
      </div>
      <button class="bg-black pa3 mv4 link dim br2 pointer ba b--black dib white">Copy to clipboard</button>
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
      .then(wait(1500)) // wait for 1.5s
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
    }
  },
  mounted() {
    this.reset();
  },
}
</script>