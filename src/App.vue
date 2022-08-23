<template>
    <IxLayout>
        <IxLayoutHeader>threejs template</IxLayoutHeader>
        <IxLayoutSider>
            <IxMenu
                mode="inline"
                v-model:expandedKeys="expandedKeys"
                :dataSource="dataSource"
                :selectedKeys="selectedKeys">
                <template #itemLabel="item">
                    <router-link :to="item.key">
                        <span>{{ item.label }}</span>
                    </router-link>
                </template>
            </IxMenu>
        </IxLayoutSider>
        <IxLayoutContent>
            <router-view></router-view>
        </IxLayoutContent>
    </IxLayout>

</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MenuData } from '@idux/components/menu'

const route = useRoute()
const [, expandedKey, selectedKey] = route.path.split('/')
const expandedKeys = ref([expandedKey])
const selectedKeys = ref([`/${ expandedKey }/${ selectedKey }`])
const dataSource = computed<MenuData[]>(() => {
    return [
        { key: `/`, label: '介绍' },
        { key: `/about`, label: 'about' },
    ]
})

watch(
    () => route.path,
    path => {
        const [, expandedKey, selectedKey] = path.split('/')
        expandedKeys.value = [expandedKey]
        selectedKeys.value = [`/${ expandedKey }/${ selectedKey }`]
    },
)
</script>

<style>
.ix-layout-header {
    border-bottom: 1px solid #ddd;
}

html, body, #app, .ix-layout, .ix-menu-inline {
    height: 100%;
}
</style>
