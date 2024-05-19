import { CriterioRepository } from "../infraestructure/repositories/criterio";
import { Criterio } from "../models/criterio.model";

class CriterioService {

    private _criterioRepository: CriterioRepository
    constructor(criterioRepository: CriterioRepository) {
        this._criterioRepository = criterioRepository;
    }

    async saveCriterio(criterio: Criterio): Promise<Criterio> { 
        const savedCriterio = await this._criterioRepository.saveCriterio(criterio);
        return savedCriterio;
    }

    async findAllCriterios(): Promise<Criterio[]> { 
        const criterios = await this._criterioRepository.findAllCriterios();
        return criterios;
    }

    async findCriterioById(idcriterio: string): Promise<Criterio> { 
        const criterio = await this._criterioRepository.findCriterioById(idcriterio);
        return criterio;
    }
}

export default new CriterioService(new CriterioRepository());