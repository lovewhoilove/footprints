<template>
    <div class="page">
        <s-table
            :data="data"
            :loading="listLoading"
            :columns="columns"
            :page-size="5"
            :page-sizes="[5, 10, 30]"
            @query-change="getList"
        ></s-table>
    </div>
</template>

<script>
import { post } from '../../shared/request';
import STable from '@/components/Table';

export default {
    components: {
        STable,
    },
    data() {
        return {
            columns: [
                // {
                //     label: 'ID', // 字段名称
                //     field: '_id', // 字段
                //     minWidth: 190, // 自定义字段宽度，不写是自适应宽度
                // },
                {
                    label: '用户名',
                    field: 'username',
                    minWidth: 160,
                },

                {
                    label: '邮箱',
                    field: 'email',
                    minWidth: 180,
                },
            ],
            data: null,
            listLoading: false,
            listQuery: {}, //查询的参数列表
        };
    },
    methods: {
        getList(evt) {
            if (evt) {
                //将所有属性的值从源对象分配到目标对象,即传递给目标对象evt
                Object.assign(this.listQuery, evt);
            }
            this.listLoading = true;
            // 这里的 this.listQuery 初始值就是 { page:1, size:10 }（参数有默认值）
            post('/user/pageUserList', this.listQuery).then((response) => {
                this.data = response;
                this.listLoading = false;
            });
        },
    },
};
</script>
<style scoped>
.page {
    padding: 20px;
}
</style>