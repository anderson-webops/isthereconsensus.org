import { appName, siteUrl, socialImageUrl } from "~/constants";

interface StaticPageMetaOptions {
	description: string;
	path: string;
	title: string;
	robots?: string;
}

export function useStaticPageMeta({ description, path, robots, title }: StaticPageMetaOptions) {
	const pageUrl = new URL(path, `${siteUrl}/`).toString();

	useSeoMeta({
		description,
		ogDescription: description,
		ogImage: socialImageUrl,
		ogImageAlt: `${appName} preview card`,
		ogImageHeight: "630",
		ogImageWidth: "1200",
		ogSiteName: appName,
		ogTitle: title,
		ogType: "website",
		ogUrl: pageUrl,
		title,
		twitterCard: "summary_large_image",
		twitterDescription: description,
		twitterImage: socialImageUrl,
		twitterImageAlt: `${appName} preview card`,
		twitterTitle: title
	});

	useHead({
		link: [
			{
				key: "canonical",
				href: pageUrl,
				rel: "canonical"
			}
		],
		meta: robots ? [{ name: "robots", content: robots }] : []
	});
}
