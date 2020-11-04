<template>
<div class="app-container">
    <el-button type="primary" @click="handleCreate">新增</el-button>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label="ID" width="95">
            <template slot-scope="scope">
                {{ scope.$index }}
            </template>
        </el-table-column>
        <el-table-column label="Title">
            <template slot-scope="scope">
                {{ scope.row.title }}
            </template>
        </el-table-column>
        <el-table-column label="Content">
            <template slot-scope="scope">
                {{ scope.row.content }}
            </template>
        </el-table-column>
        <el-table-column label="Author" width="110" align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.author }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="Create_Time" width="200">
            <template slot-scope="scope">
                <i class="el-icon-time" />
                <span>{{ scope.row.createtime }}</span>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="新建博客" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="title" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="content" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    getBlogList,
    saveBlog,
    deleteBlog,
    updateBlog,
    getBlogDetail,
} from "@/api/table";

export default {
    data() {
        return {
            list: null,
            listLoading: true,
            dialogFormVisible: false,
            type: "",
            id: "",
            form: {
                title: "",
                content: "",
            },
            formLabelWidth: "120px",
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.listLoading = true;
            getBlogList().then((response) => {
                this.list = response.data;
                this.listLoading = false;
            });
        },
        handleCreate() {
            this.type = "add";
            this.dialogFormVisible = true;
        },
        handleOk() {
            if (this.type == "add") {
                saveBlog(this.form).then((res) => {
                    this.dialogFormVisible = false;
                    this.$notify({
                        title: "成功",
                        message: res.message,
                        type: "success",
                    });
                    (this.form = {
                        title: "",
                        content: "",
                    }),
                    this.fetchData();
                });
            } else {
                updateBlog({
                        id: this.id,
                    },
                    this.form
                ).then((res) => {
                    this.dialogFormVisible = false;
                    this.$notify({
                        title: "修改成功",
                        message: res.message,
                        type: "success",
                    });
                    (this.form = {
                        title: "",
                        content: "",
                    }),
                    this.fetchData();
                });
            }
        },
        handleUpdate(row) {
            this.id = row.id;
            this.type = "edit";
            getBlogDetail({
                id: this.id,
            }).then((res) => {
                this.dialogFormVisible = true;
                const data = res.data;
                this.form = {
                    title: data.title,
                    content: data.content,
                };
            });
        },
        handleDelete(row) {
            const id = row.id;
            deleteBlog({
                id,
            }).then((res) => {
                this.$notify({
                    title: "成功",
                    message: res.message,
                    type: "success",
                });
                this.fetchData();
            });
        },
    },
};
</script>
