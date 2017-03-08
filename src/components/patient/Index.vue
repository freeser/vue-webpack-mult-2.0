<template>
    <div class="main">
        <mt-button type="default" size="large" name="default" @click.native="showTotal">default</mt-button>
        <mt-button type="primary" size="large" name="primary">primary</mt-button>
        <mt-button type="danger" size="large" name="danger">danger</mt-button>
    </div>
</template>
<script>    
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {

            }
        },
        methods: {
            showTotal() {
                MessageBox({
                    title: '提示',
                    message: '确定执行此操作?',
                    showCancelButton: true
                });
            }
        }
    }
</script>