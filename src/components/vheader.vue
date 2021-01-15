<template>
  <mt-header :title="title">
    <span @click="goBack" slot="left">
      <mt-button icon="back"></mt-button>
    </span>
    <!--<mt-button icon="more" slot="right"></mt-button>-->
  </mt-header>
</template>

<script>
  import common from '../mixins/common'
  import {Header, Button} from 'mint-ui'
  export default {
    mixins: [common],
    name: 'vheader',
    props: ['title'],
    components: {
      'mt-header': Header,
      'mt-button': Button
    }
  }
</script>
