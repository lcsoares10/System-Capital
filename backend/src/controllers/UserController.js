const User = require('@/src/models/User');

module.exports = {

    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },

    async get(req, res) {

        const { id } = req.params;
        const user = await User.findByPk(id,  { 
            //include: { association: 'user', required: true }
        });

        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe'} );
        }

         return res.json(user);
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