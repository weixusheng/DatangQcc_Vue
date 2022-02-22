import { Request } from "@/utils/request";

export function get_interface() {
  return Request.axiosInstance({
    url: "interface/get_list",
    method: "get"
  });
}

export function insert_interface(parameter: any) {
  return Request.axiosInstance({
    url: "interface/insert",
    method: "post",
    data: parameter
  });
}

export function delete_interface(parameter: any) {
  return Request.axiosInstance({
    url: "interface/delete",
    method: "post",
    data: parameter
  });
}

export function update_interface(parameter: any) {
  return Request.axiosInstance({
    url: "interface/update",
    method: "post",
    data: parameter
  });
}
