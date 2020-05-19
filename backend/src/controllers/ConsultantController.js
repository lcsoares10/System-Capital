const Consultant = require('@/src/models/Consultant');

module.exports = {

    async index(req, res) {
        const consultants = await Consultant.findAll({
            include: { association: 'user', required: true }
        });
        return res.json(consultants);
    },

    async investors(req, res) {

        const { id } = req.params;
        const consultant = await Consultant.findByPk(id);

        if (!consultant) {
            return res.status(400).json({ error: 'Consultor não existe'} );
        }

        return res.json(consultant);

        // const consultants = await Consultant.findOne(id, {
        //     include: { association: 'investors' }
        // });
        // return res.json(consultants);
    },

};