package com.sh.db.bl;

import com.sh.db.map.module.ModuleDTO;
import com.sh.db.map.module.ModuleTypeDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.map.user.UserGrandAuthority;
import com.sh.db.service.ModuleDAO;
import com.sh.utils.ModuleDisplay;
import com.sh.utils.ModulePosType;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Admin on 03.05.2016.
 */
@Component
public class ModuleBL {
    private static final Logger LOG = Logger.getLogger(ModuleBL.class);

    @Autowired
    private PermissionBL permissionBL;

    @Autowired
    ModuleDAO moduleDAO;


    @Value("${module.admin.actions.panel}")
    private Integer modulAdminAction;


    public List<ModuleDTO> getModuleBydisplaypos(Integer projId, Integer forumid, ModuleDisplay displaypos, ModulePosType modulePosType, UserDTO forUserDTO) {
        UserDTO curUserDTO = permissionBL.getCurrentLoggedUser();

        List<ModuleDTO> moduleDTOList = null;
        if (displaypos == ModuleDisplay.Dashboard || displaypos == ModuleDisplay.List) {
            moduleDTOList = moduleDAO.getModules(projId, forumid, displaypos, null, curUserDTO);
        } else if (displaypos == ModuleDisplay.ItemPanel) {
            moduleDTOList = moduleDAO.getItemPanelModules(projId, forumid, modulePosType, curUserDTO);
        } else if (displaypos == ModuleDisplay.UserArticle || displaypos == ModuleDisplay.UserComments || displaypos == ModuleDisplay.UserNotification || displaypos == ModuleDisplay.UserProfile) {
            moduleDTOList = getUserPanelModules(projId, forumid, displaypos, curUserDTO);
        } else if (displaypos == ModuleDisplay.OurTeam) {
            moduleDTOList = getUserPanelModules(projId, forumid, displaypos, curUserDTO);
        } else if (displaypos == ModuleDisplay.Widget) {
            moduleDTOList = getUserPanelModules(projId, forumid, displaypos, curUserDTO);
        }

        return moduleDTOList;
    }

    public List<ModuleDTO> getUserPanelModules(Integer projId, Integer forumid, ModuleDisplay moduleDisplay, UserDTO user) {
        List<ModuleDTO> moduleDTOList = moduleDAO.getModules(projId, forumid, moduleDisplay, null, null);
        moduleDTOList.addAll(moduleDAO.getModules(projId, 0, moduleDisplay, null, null));

        if (permissionBL.checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER) || permissionBL.checkGrandAuthority(UserGrandAuthority.ROLE_MODERATION)) {
            moduleDTOList.add(moduleDAO.getModuleById(projId, modulAdminAction));
        }
        return moduleDTOList;
    }

    public Boolean createModule(Integer forumid, ModuleDisplay displaypos, ModulePosType modulePosType, Integer modType) throws Exception {

        if (!permissionBL.checkGrandAuthority(UserGrandAuthority.ROLE_MANAGER)) {
            throw new Exception("You don't have permission ");
        }
        ModuleTypeDTO moduleTypeDTO = moduleDAO.getModuleTypebyId(modType);
        if (moduleTypeDTO == null) {
            LOG.error("Can't find module: " + modType + " fo forum: " + forumid);
            return false;
        }
        return  moduleDAO.createModule(forumid, displaypos, modulePosType,  moduleTypeDTO);

    }
}