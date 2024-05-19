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
}

export default new CriterioService(new CriterioRepository());