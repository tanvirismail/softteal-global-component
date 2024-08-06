import { useCallback, useEffect, useState } from "react";
import axios from '@/_global/utils/axios';
import { Container } from "@mui/material";
import Page from '@/_global/components/Page';
import useSettings from '@/_global/hooks/useSettings';
import Layout from '@/_global/layouts';

ExportHtml.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};

export default function ExportHtml() {
    const { themeStretch } = useSettings();
    const [html, setHtml] = useState("");
    const getData = useCallback(async () => {
        try {
            const response = await axios.get('/api/export/html'); 
            setHtml(response.data)            
    
        } catch (error) {
          console.log(error);
        }
    }, []);
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <Page title="Device List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <div dangerouslySetInnerHTML={{__html: html}} />
            </Container>
        </Page>
    )
}