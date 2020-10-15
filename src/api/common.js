// 公共api
import {apiFruitService} from '@/utils/request'

// 上传单个文件夹
export function uploadImage(fileObj) {
    let formData = new FormData()
    formData.set("file", fileObj.file)
    console.log(fileObj.file)

    return apiFruitService({
      url: '/file/upload',
      method: 'post',
      data: formData
    })
}
