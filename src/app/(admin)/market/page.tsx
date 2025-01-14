import PageContainer from '@/components/layout/page-container';

import PageCompoent from './components/page-component';

export const metadata = {
    title: 'Market Place',
};

export default async function Page() {
    return (
        <PageContainer >
            <PageCompoent />
        </PageContainer>
    );
}
