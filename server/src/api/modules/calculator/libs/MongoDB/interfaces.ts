import { ObjectId } from "mongodb";

export type Id = {
  _id: ObjectId;
};

export type queryParams = {

}

export type Attributes = Id;

// TODO $in, gt, lt, or
