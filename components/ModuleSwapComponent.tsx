import ModuleList from '@/config/ModuleList';

export default function MouleSwapComponent() {
    return (
        <>
            {
            ModuleList.length > 0 && ModuleList.map((moduleData, index) => {
                return (
                <iframe 
                    key={index} 
                    id={`crossDomainIframe-${index}`} 
                    src={`${moduleData.url}/module-swap`}
                    height={0} 
                    width={0} 
                    style={{position: 'absolute', left: '-4px'}}
                ></iframe>
                )
            })
            }
        </>
    )
}