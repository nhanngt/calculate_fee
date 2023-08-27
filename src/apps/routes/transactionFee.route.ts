import { Router } from "express";
import * as schemaValidatorMdw from "@app/apps/middlewares/schemaValidator.middleware";
import { transactionFeeReqSchema } from "@app/apps/dtos/transaction.dto";
import {
  calculateTransactionFeeUC,
  ICalculateTransactionFeeReq,
} from "@app/business/transaction/usecases/calculateTransactionFeeUC";
import CryptoNetworkService from "@app/infrastructure/cryptoNetworkService/cryptoNetworkService";

const router = Router();

router.post(
  "/",
  schemaValidatorMdw.schemaValidator({ body: transactionFeeReqSchema }),
  async (req, res) => {
    const inputData = req.body as ICalculateTransactionFeeReq;
    const { error, result } = await calculateTransactionFeeUC(inputData, {
      cryptoNetworkRepo: new CryptoNetworkService(),
    });

    if (error) {
      return res.status(error.code).json({ error });
    }

    res.status(200).json(result);
  }
);

export default router;
