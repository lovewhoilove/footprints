<template>
    <div class="singleImageUpload2 upload-container">
        <el-upload
            :data="dataObj"
            :multiple="false"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeUpload"
            class="image-uploader"
            drag
            action="http://upload-z2.qiniup.com"
        >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
                拖动文件至此或
                <em>点击上传</em>
            </div>
        </el-upload>
        <div v-show="imageUrl.length > 0" class="image-preview">
            <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
                <img :src="imageUrl" />
                <div class="image-preview-action">
                    <i class="el-icon-delete" @click="rmImage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken } from './qiniu';

export default {
    name: 'SingleImageUpload',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            tempUrl: '',
            dataObj: { token: '', key: '' },
        };
    },
    computed: {
        imageUrl() {
            return this.value;
        },
    },
    methods: {
        rmImage() {
            this.emitInput('');
        },
        emitInput(val) {
            this.$emit('input', val);
        },
        handleImageSuccess() {
            this.emitInput(this.tempUrl);
        },
        beforeUpload() {
            const _self = this;
            return new Promise((resolve, reject) => {
                getToken()
                    .then((response) => {
                        console.table(response.data);
                        const key = response.data.key;
                        const token = response.data.token;
                        _self._data.dataObj.token = token;
                        _self._data.dataObj.key = key;
                        this.tempUrl = `http://r4vd3rgqs.hn-bkt.clouddn.com/${key}`;
                        resolve(true);
                    })
                    .catch(() => {
                        reject(false);
                    });
            });
        },
    },
};
</script>

<style scoped>
.upload-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.image-uploader {
    height: 100%;
}

.image-preview {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    border: 1px dashed #d9d9d9;
}
.image-preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.image-preview-wrapper > img {
    width: 100%;
    height: 100%;
}

.image-preview-action {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
    cursor: pointer;
    text-align: center;
    line-height: 200px;
}

.el-icon-delete {
    font-size: 36px;
}

image-preview:hover .image-preview-action {
    opacity: 1;
}
</style>