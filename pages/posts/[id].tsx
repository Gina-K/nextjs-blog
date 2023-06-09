import Head from 'next/head';
import type {GetStaticProps, GetStaticPaths} from 'next';

import utilStyles from '../../styles/utils.module.css';
import Layout from "../../components/layout";
import {getAllPostIds, getPostData} from "../../lib/posts";
import Date from "../../components/date";

export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}
export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
            </article>
        </Layout>
    );
}