export interface Topic {
	_id: string;
	title: string;
	slug: string;
	description?: string;
	order?: number;
	accent?: string;
	questionCount?: number;
}

export interface Question {
	_id: string;
	title: string;
	body?: string;
	sourceUrl?: string;
	displayName?: string;
	author?: string;
	authorName?: string;
	authorModel?: "User" | "Admin";
	status?: "open" | "flagged" | "archived";
	createdAt?: string;
	topic: Topic;
}

export interface TopicResponse {
	topics: Topic[];
}

export interface SingleTopicResponse {
	topic: Topic;
}

export interface QuestionResponse {
	question: Question;
}

export interface QuestionsResponse {
	questions: Question[];
}
