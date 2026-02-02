export class JobController {
    static async getAll(req, res){
        const { text, title, level, limit = DEFAULTS.LIMIT_PAGINATION, technology, offset = DEFAULTS.LIMIT_OFFSET } = req.query

        let filteredJobs = jobs

        if(text){
            const searchTerm = text.toLowerCase()
            filteredJobs = filteredJobs.filter(jobs => 
                jobs.titulo.toLowerCase().includes(searchTerm) || jobs.descripcion.toLowerCase().includes(searchTerm)
            )
        }

        if(technology){
            filteredJobs = filteredJobs.filter(jobs => 
                jobs.tecnologias.includes(technology)
            )
        }

        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

        return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber})
    }

    static async getId(req, res){
        const { id } = req.params

        const job = jobs.find(job => job.id === id)

        if(!job){
            return res.status(404).json({ error: 'Job not found' })
        }

        return res.json(job)
    }

    static async create(req, res){
        const { titulo, empresa, ubicacion, data } = req.body

        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data,
        }

        jobs.push(newJob)

        return res.status(201).json(newJob)
    }

    static async update(req, res){}
    static async partialUdpate(req, res){}
    static async delete(req, res){}
}