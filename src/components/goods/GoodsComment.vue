<template>
    <div>
        <cmtbox :cmtid="$route.params.id"></cmtbox>
    </div>
    
</template>

<script>
import cmtbox from '../subcomponents/Comment.vue'

export default{
    components:{
        cmtbox
    }
}
</script>
<style lang="scss" scoped>

</style>