// Exemplo de código Node.js com Express (apenas para ilustrar)
const express = require('express');
const fetch = require('node-fetch'); // Instale 'node-fetch' com npm
const app = express();
const apiKey = 'SUA_CHAVE_API_GOOGLE'; // Sua chave de API do Google

app.get('/api/lugares/detalhes', async (req, res) => {
    const placeId = req.query.id;

    if (!placeId) {
        return res.status(400).json({ error: 'ID do lugar é obrigatório' });
    }

    // URL da API de Place Details
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,photos&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
            return res.status(500).json({ error: 'Erro da Google Places API' });
        }
        
        const lugar = data.result;
        const fotoReferencia = lugar.photos && lugar.photos.length > 0 ? lugar.photos[0].photo_reference : null;
        
        let fotoUrl = '';
        if (fotoReferencia) {
            // URL da API de Place Photos para obter a URL da imagem
            fotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${fotoReferencia}&key=${apiKey}`;
        }
        
        // Retorna os dados para o front-end
        res.json({
            nome: lugar.name,
            nota: lugar.rating,
            foto: fotoUrl
        });

    } catch (error) {
        console.error('Erro na requisição para a Google API:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Inicie o servidor, por exemplo, na porta 3000
app.listen(3000, () => console.log('Backend rodando na porta 3000!'));