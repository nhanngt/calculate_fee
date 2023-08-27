import { IConfigure } from "@app/business/common/interfaces/configure.interface";

export const configure: IConfigure = {
  serverPort: Number(process.env.PORT || 8000),
};
