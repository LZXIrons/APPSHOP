<template>
     <div class="iconfont tag">
            <ul style="display: flex">
                <li class="wra-tag">
                    <i class="iconfont icon-anquanbaozhang i-bk"></i>
                    <span class="font-t-c">正品保证</span>
                </li>
                <li class="wra-tag ">
                    <i class="iconfont icon-zonglanmendian54 i-bk"></i>
                    <span class="font-t-c">门店体检</span>
                </li>
                <li class="wra-tag ">
                    <i class="iconfont icon-yunshuzhongwuliu i-bk"></i>
                    <span class="font-t-c">极速运送</span>
                </li>
                <li class="wra-tag ">
                    <i class="iconfont icon-tuikuan i-bk"></i>
                    <span class="font-t-c">七天退货</span>
                </li>
            </ul>
        </div>
</template>

<script>
export default {
    name: 'name'

}
</script>

<style>

    .wra-tag {
        display: inline-block;
        text-align: center;
        flex: 1;
        line-height: 1rem;
        text-indent: 8px;
    }
    
    .i-bk{
        padding: 3px;
        border-radius: 50%;
        font-size: 14px;
        color: #fff;
        background: #f40f46;
    }
    
    .font-t-c{
        font-size: 12px;
        color: #ccc
    }
    
</style>