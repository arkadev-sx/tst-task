<template>
  <div class="goods-grid">
    <GridCategory
      v-for="(item, index) in store.collection"
      :key="index"
      :title="item.name"
      :isEmptyBlock="Object.keys(item.goods).length === 0"
    >
      <GridItem
        v-for="(good, ix) in store.collection[index].goods"
        :key="ix"
        :catID="index"
        :itemID="ix"
        :item="good"
      />
    </GridCategory>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import GridCategory from '../components/gridCategory.vue'
import GridItem from '../components/gridItem.vue'

import { useMainStore } from '../../../stores/main'

export default defineComponent({
  name: 'GoodsGrid',
  components: { GridCategory, GridItem },
  setup() {
    const store = useMainStore()

    return {store}
  },
})
</script>
<style lang="stylus">
.goods-grid {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 28px;
}
</style>
