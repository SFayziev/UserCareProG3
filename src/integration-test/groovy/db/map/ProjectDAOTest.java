package db.map;

import db.controller.IntegrationTest;
import com.sh.db.map.project.ProjectDTO;
import com.sh.db.service.ProjectDAO;
import jdk.nashorn.internal.ir.annotations.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by shuhrat on 16.08.2015.
 */
public class ProjectDAOTest extends IntegrationTest {
    @Autowired
    ProjectDAO projectDAO;


    @Ignore
    @Test
    public void addProject(){
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setName("feedback");
        projectDTO= projectDAO.save(projectDTO);
        System.out.println(projectDTO );
    }

    @Test
    public void getDesign(){

        System.out.println(projectDAO.getProjectDesign(2).getProjectDTO());
        System.out.println(projectDAO.getProjectbyId(2).getProjectDesignDTO());

    }

    @Test
    public void getListProject(){
        for (ProjectDTO projectDTO: projectDAO.findAll() ){
            System.out.println(projectDTO);
        }
    }
}