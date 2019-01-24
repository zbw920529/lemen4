<template>
    <Layout class="home">
            <h1>welcome!</h1>
            <h2>{{getUser.username}}：欢迎登陆MS后台管理系统</h2>

    </Layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'getUser',
                'menuList'
            ])
        },
        // methods:{
        //     getList(){
        //         console.log(this.menuList)
        //     }
        // }

    }
</script>

<style scoped>
    .home{
        width: auto;
        height: 840px;
        background: #f1f1f1;
        padding: 20px;
        position: flex;
        border:1px solid #dcdee2;
        min-width: 1100px;
    }
</style>
