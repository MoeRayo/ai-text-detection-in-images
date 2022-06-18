<template>
  <div class="flex flex-column flex-row-ns pa3 calisto bg-black-05 vh-100">
    <form enctype="multipart/form-data" novalidate class="w-50-ns w-100 ph3">
      <h2>Upload Image</h2>
      <div class="b--dashed bw1 b--light-purple pa3 hover-bg-black-10 bg-animate pointer relative h4">
        <input type="file" multiple accept="image/*" class="input-file absolute w-100 h4 pointer o-0">
        <p class="tc f4">
          Drag your file here to begin<br> or click to browse
        </p>
      </div>
      <button class="bg-light-blue pa3 mv4 link dim br2 pointer ba b--light-blue dib">Extract Text</button>
    </form>
    <section class="w-40-l w-50-m w-100 ph3">
      <h2>Extracted Text</h2>
      <div class="bg-light-blue br3 h-auto pa3 f4 lh-copy">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia autem veritatis facere commodi, id repellat accusantium. Aliquam animi quaerat ullam vero ad. Nam, laudantium at. Vitae maiores beatae nostrum! Corporis delectus inventore dolor, necessitatibus, ipsa voluptate aspernatur ipsum officia earum, at reiciendis atque beatae illum libero eligendi eius vel! Ex.
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta animi a perferendis voluptas sequi quidem doloribus aliquid, doloremque quaerat natus quam placeat quasi cumque vitae non culpa adipisci eius eos?
      </div>
      <button class="bg-black pa3 mv4 link dim br2 pointer ba b--black dib white">Copy to clipboard</button>
    </section>
  </div>
</template>

