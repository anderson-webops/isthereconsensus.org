import mongoose, { Schema } from "mongoose";
import { savedComparisonSlugsSchema } from "../../utils/comparisonLibrary.js";

export const MAX_SAVED_REVIEWS = 200;
export const MAX_FOLLOWED_TOPICS = 100;

export interface IReaderLibrary {
	_id: string;
	revision: number;
	savedReviewIds: string[];
	followedTopicIds: string[];
	savedComparisonSlugs: string[];
}

function ids(maximum: number) {
	return {
		type: [String],
		default: [],
		validate: (values: string[]) =>
			values.length <= maximum
			&& new Set(values).size === values.length
			&& values.every(value => /^[a-f\d]{24}$/.test(value))
	};
}

const readerLibrarySchema = new Schema<IReaderLibrary>(
	{
		// The authenticated role and id form the key. The intrinsic _id index also
		// makes simultaneous first writes safe without relying on index creation.
		_id: { type: String, required: true, match: /^(user|admin):[a-f\d]{24}$/ },
		revision: { type: Number, required: true, min: 1, validate: Number.isSafeInteger },
		savedReviewIds: ids(MAX_SAVED_REVIEWS),
		followedTopicIds: ids(MAX_FOLLOWED_TOPICS),
		savedComparisonSlugs: {
			type: [String],
			default: [],
			validate: (values: string[]) => savedComparisonSlugsSchema.safeParse(values).success
		}
	},
	{ versionKey: false, strict: "throw" }
);

export const ReaderLibrary = mongoose.model<IReaderLibrary>("ReaderLibrary", readerLibrarySchema);
