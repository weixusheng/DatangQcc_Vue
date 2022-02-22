import { Request } from "@/utils/request";

export function get_scheduler() {
  return Request.axiosInstance({
    url: "scheduler/get_apslog",
    method: "get"
  });
}
export function add_single(parameter: any) {
  return Request.axiosInstance({
    url: "scheduler/add_single",
    method: "post",
    data: parameter
  });
}

export function add_every(parameter: any) {
  return Request.axiosInstance({
    url: "scheduler/add_every",
    method: "post",
    data: parameter
  });
}

export function add_week(parameter: any) {
  return Request.axiosInstance({
    url: "scheduler/add_week",
    method: "post",
    data: parameter
  });
}

export function remove_schedule(parameter: any) {
  return Request.axiosInstance({
    url: "scheduler/remove_schedule",
    method: "post",
    data: parameter
  });
}
