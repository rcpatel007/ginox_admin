import { constants as ERROR_CONST } from "../../Constant/Error&Success";
import * as Yup from "yup";

export const AddSectionSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_TITLE)
    .min(5, ERROR_CONST.MIN_MAX_TITLE)
    .max(60, ERROR_CONST.MIN_MAX_TITLE),
  title_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_TITLE_1)
    .min(5, ERROR_CONST.MIN_MAX_TITLE_1)
    .max(60, ERROR_CONST.MIN_MAX_TITLE_1),
  card_1_title: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_CARD_1_TITLE)
    .min(5, ERROR_CONST.MIN_MAX_CARD_TITLE_1)
    .max(60, ERROR_CONST.MIN_MAX_CARD_TITLE_1),
  card_2_title: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_CARD_2_TITLE)
    .min(5, ERROR_CONST.MIN_MAX_CARD_TITLE_2)
    .max(60, ERROR_CONST.MIN_MAX_CARD_TITLE_2),
  q1_title: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_Q1_TITLE)
    .min(5, ERROR_CONST.MIN_MAX_Q1_TITLE)
    .max(60, ERROR_CONST.MIN_MAX_Q1_TITLE),
  q2_title: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_Q2_TITLE)
    .min(5, ERROR_CONST.MIN_MAX_Q2_TITLE)
    .max(60, ERROR_CONST.MIN_MAX_Q2_TITLE),
  q3_title: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_Q3_TITLE)
    .min(5, ERROR_CONST.MIN_MAX_Q3_TITLE)
    .max(60, ERROR_CONST.MIN_MAX_Q3_TITLE),
  q4_title: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_Q4_TITLE)
    .min(5, ERROR_CONST.MIN_MAX_Q4_ITLE)
    .max(60, ERROR_CONST.MIN_MAX_Q4_ITLE),
  description: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  description_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION_1)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  description_2: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION_2)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  description_3: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION_3)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  description_4: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION_4)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q1_description_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q1_description_2: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q2_description_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q2_description_2: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q2_description_3: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q3_description_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q3_description_2: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q3_description_3: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q4_description_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  q4_description_2: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  card_1_description: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  card_2_description: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  card_1_description_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  card_1_description_2: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  card_2_description_1: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
  card_2_description_2: Yup.string()
    .trim()
    // .required(ERROR_CONST.ERROR_DESCRIPTION)
    .min(5, ERROR_CONST.MIN_MAX_DESCRIPTION)
    .max(200, ERROR_CONST.MIN_MAX_DESCRIPTION),
});
