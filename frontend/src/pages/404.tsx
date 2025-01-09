import Layout from '@/hocs/Layout';

export default function Page() {
  return <div>Page not found</div>;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
