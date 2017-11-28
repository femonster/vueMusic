<template>
    <div class="tab">
        <!-- tag 指router-link 被渲染成哪种DOM结构 -->
        <router-link tag="div" class="tab-item" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>
<script>
export default {
  
}
</script>
<style lang="stylus" scoped>
// 为什么这里是 ~ ，我配置的是common？？
@import "~common/stylus/variable"
.tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
        flex: 1
        text-align: center
        .tab-link
            padding-bottom: 5px
            color: $color-text-l
        &.router-link-active
            .tab-link
                color: $color-theme
                border-bottom: 2px solid $color-theme
</style>
