import { ElMessage } from "element-plus";

export class msg {
  public static normal(ms: string) {
    ElMessage(ms);
  }
  public static success(ms: string) {
    ElMessage({
      message: ms,
      type: "success",
    });
  }
  public static warning(ms: string) {
    ElMessage({
      message: ms,
      type: "warning",
    });
  }
  public static error(ms: string) {
    ElMessage({
      message: ms,
      type: "error",
    });
  }
}
