import {apiFruitService} from '@/utils/request'

export function getBook(data) {
  return apiFruitService({
    url: '/fruit/book',
    method: 'get',
    data
  })
}

export function addBook(data) {
  return apiFruitService({
    url: '/fruit/book',
    method: 'post',
    data,
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
}

export function upload(data, headers) {
  let formData = new FormData();
  formData.set("file", fileObj.file);
  return apiFruitService({
    url: '/file/upload',
    method: 'post',
    data
  })
}