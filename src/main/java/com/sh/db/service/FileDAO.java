package com.sh.db.service;

import com.sh.db.GenericDaoImpl;

import com.sh.db.map.ArticleDTO;
import com.sh.db.map.FileDTO;
import com.sh.db.map.ImgDTO;
import com.sh.db.map.UserDTO;
import com.sh.utils.ImageResizer;
import com.sh.utils.ImageType;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

/**
 * Created by Lenovo on 31.10.2015.
 */
@Controller
@Transactional
public class FileDAO extends GenericDaoImpl<FileDTO> {

    @Value("${image.catalog}")
    private  String imageCatalog;

    private static final Logger LOG = Logger.getLogger(FileDAO.class);

    @Autowired
    public FileDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    public FileDTO saveImage(ImageType itype,  InputStream streamp) throws IOException {
        try {

            String uuid = UUID.randomUUID().toString();
            uuid=uuid.replaceAll("-","");
            String  filename=uuid.substring(1,12)+itype.getTheFileExtension();
            String filedir= uuid.substring(13,16) ;
            String outPAth=System.getProperty("user.dir");
            outPAth=outPAth +"/web-app"+imageCatalog;

            ImageResizer imageResizer= new ImageResizer(itype.getTheWidthSize() ,itype.getTheHeightSize() , streamp );
            File outputDir= new File(outPAth + "/"+ filedir);
            if (!outputDir.exists()){
                if (!outputDir.mkdir()){
                    LOG.error("Can't create directory for img : " + outputDir.getAbsolutePath() );
                }
            }
            File outputfile = new File(outputDir.getAbsolutePath()  +"/" + filename );
            ImageIO.write( imageResizer.resizeImageWithHint(), itype.getTheFormatName() , outputfile);
            FileDTO fileDTO= new FileDTO(outputfile.length(), imageCatalog + "/" + filedir + "/" + filename, outputfile.getPath() , 0,0  );

            return  save(fileDTO);
        } catch (IOException e) {
            LOG.error(e.getMessage());
            throw e;
        }

    }

    @Cacheable( value = "imgDTO" )
    public List<ImgDTO> getLocalImageByType(Integer type){
        Criteria cr = getSessionFactory().getCurrentSession() .createCriteria(ImgDTO.class);
        cr.add(Restrictions.sqlRestriction("itype= " + type));
        return  cr.list();
    }

    @Cacheable( value = "imgDTO" )
    public ImgDTO getLocalImageByKey(Integer type, String  key ){
        Criteria cr = getSessionFactory().getCurrentSession() .createCriteria(ImgDTO.class);
        cr.add(Restrictions.sqlRestriction("itype= " + type));
        cr.add(Restrictions.eq("typekey", key));
        return (ImgDTO) cr.uniqueResult();
    }


    @Cacheable( value = "imgDTO" )
    public ImgDTO getLocalImageById(Integer id ){
        Criteria cr = getSessionFactory().getCurrentSession() .createCriteria(ImgDTO.class);
        cr.add(Restrictions.eq("id", id));
        return (ImgDTO) cr.uniqueResult();
    }


    @Transactional
    public void  updateImgDTO(ImgDTO imgDTO ){
        currentSession().update(imgDTO);
    }

}
