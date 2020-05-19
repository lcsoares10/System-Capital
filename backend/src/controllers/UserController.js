const User = require('@/src/models/User');

module.exports = {

    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },

/*     async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        
        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({id});
    } */
};