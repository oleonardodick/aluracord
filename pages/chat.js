import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaDeMensagens.length,
            de: 'oleonardodick',
            texto: novaMensagem,
            data: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString()

        };
        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens
        ]);
        setMensagem('');
    }

    function handleRemoveMensagem(id) {
        setListaDeMensagens(listaDeMensagens.filter(msg => msg.id !== id));
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/doctor-stranges-window-of-the-worlds-1024x576.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} removeMensagem={handleRemoveMensagem} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(evento) => {
                                const valor = evento.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(evento) => {
                                if (evento.key === "Enter") {
                                    evento.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '90%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                display: 'inline-block'
                            }}
                        />
                        <Button
                            variant='primary'
                            colorVariant='neutral'
                            label='Enviar'
                            styleSheet={{
                                width: '8%',
                                color: appConfig.theme.colors.neutrals[200],
                                display: 'inline-block',
                            }}
                            onClick={() =>{
                                handleNovaMensagem(mensagem);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/oleonardodick.png`}
                        />
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'inline-block',
                                padding: '8px',
                                borderRadius: '10px',
                                backgroundColor: appConfig.theme.colors.neutrals[400]
                            }}
                        >
                            <Text
                                tag="strong"
                                styleSheet={{
                                    display: 'inline-block',
                                    padding: '0px 5px 5px 0px'
                                }}>
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[200],
                                    display: 'inline-block',
                                }}
                                tag="span"
                            >
                                {`${mensagem.data} ${mensagem.hora}`}
                            </Text>
                            <Button
                                variant='tertiary'
                                colorVariant='neutral'
                                label='X'
                                styleSheet={{
                                    fontSize: '10px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                                onClick={() => {
                                    props.removeMensagem(mensagem.id);
                                }}
                            />
                            <Text
                                tag='strong'
                            >
                                {mensagem.texto}
                            </Text>
                        </Box>
                    </Text>
                );
            })}

        </Box>
    )
}