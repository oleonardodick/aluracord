import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import {useRouter} from 'next/router';
import React from 'react';

function Titulo(props) {
    const Tag = props.tag;
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle/>
//             {/*Aqui foi usado a palavra título na tag pois deve ser o nome da função criada.*/}
//             <Titulo tag = "h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>   
//         </div>
//     )   
//   } 
// export default HomePage

export default function PaginaInicial() {
    //const username = 'LDBernardes1994';
    const [username, setUsername]= React.useState('oleonardodick');
    let [nome, setNome] = React.useState('Leonardo Bernardes');
    let [permiteEntrar, setPermiteEntrar] = React.useState(true);
    let [fotoUsuario, setFotoUsuario] = React.useState(`https://github.com/${username}.png`);
    const roteamento = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[100],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/doctor-stranges-window-of-the-worlds-1024x576.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '25px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (evento){
                            evento.preventDefault();
                            //empilha a url para abrir a página. Com isso ele não recarregará
                            //toda a página e sim somente o necessário
                            roteamento.push('/chat');
                            //Modo comum de trocar de página. Funciona também porém recarrega
                            //toda a página.
                            //window.location.href ='/chat';
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/* <input
                            type="text"
                            value={username}
                            onChange={function (evento){
                                //Onde está o valor
                                const valor = evento.target.value;
                                //Troca o valor da variável através do react
                                setUsername(valor);
                            }} 
                        /> */}
                        <TextField
                            value={username}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[400],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                            onChange={function (evento){
                                //Onde está o valor
                                const valor = evento.target.value;
                                //Troca o valor da variável através do react
                                setUsername(valor);
                                setPermiteEntrar(valor.length > 2);

                            }}
                            onBlur={function(evento){
                                let baseUrl = 'https://api.github.com/users/';
                                const valor = evento.target.value;
                                setUsername(valor);
                                fetch(baseUrl+valor).then(function(respostaServidor){
                                        return respostaServidor.json()
                                    }).then(function(respostaConvertida){
                                        setNome(respostaConvertida.name)
                                    })
                                setFotoUsuario(`https://github.com/${username}.png`)
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            disabled = {!permiteEntrar}
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[900],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[500],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '30px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={fotoUsuario}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {nome}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}