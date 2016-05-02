package com.sh.db.service;

import com.sh.db.GenericDaoImpl;

import com.sh.db.map.user.OauthidDTO;
import com.sh.db.map.user.UserDTO;
import com.sh.db.map.user.UserPermissionsDTO;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

/**
 * Created by shuhrat on 05.09.2015.
 */
@Controller
public class UserDAO extends GenericDaoImpl<UserDTO> {
    private static final Logger LOG = Logger.getLogger(UserDAO.class);
//    @Value("${image.catalog}")
//    private  String imageCatalog;


    @Value("${default.user.topic.module.id}")
    private  String usertopicModId;

    @Autowired
    private ShaPasswordEncoder passwordEncoder;

    /**
     * Autowiring sessionFactory
//     * @param sessionFactory
     */
    @Autowired
    public UserDAO(SessionFactory sessionFactory) {
        setSessionFactory(sessionFactory);
    }

    @Transactional
    public UserDTO createLogin(UserDTO userDTO){
        userDTO.setPassword(passwordEncoder.encodePassword(userDTO.getPassword(), null ) );
        userDTO=  makePersistent(userDTO);
       return userDTO;
    }

//    @Transactional
    @CacheEvict(value = "userDTO" ,   allEntries = true)
    public UserDTO saveProfile(UserDTO userDTO){
//        userDTO.setPassword(passwordEncoder.encodePassword(userDTO.getPassword(), null ) );
        userDTO=  makePersistent(userDTO);
        return userDTO;
    }

//    public UserDTO getByLogin(Integer projid, String login){
//        return (UserDTO) getSessionFactory().getCurrentSession().createQuery("from UserDTO as us where us.username=:username")
//                .setParameter("username", login).uniqueResult();
//    }
//
    @Cacheable( value = "userDTO" )
    public UserDTO getUserByEmail(Integer projid, String email) {
        return (UserDTO) getSessionFactory().getCurrentSession().createQuery("from UserDTO as us where us.projid=:projid and  us.email=:email")
                .setParameter("email", email).setParameter("projid", projid) .uniqueResult();
    }


    public UserPermissionsDTO getUserPermission(Integer projid, Integer userid ) {
        return (UserPermissionsDTO) getSessionFactory().getCurrentSession().createQuery("select ud.userPermissionsDTO from UserDTO ud where ud.id=:id and  ud.projid=:projid")
                .setParameter("id", userid).setParameter("projid", projid).uniqueResult();
    }

    @CacheEvict(value = "userDTO" ,   allEntries = true)
    public UserPermissionsDTO saveUserPermission(UserPermissionsDTO userPermissionsDTO) throws Exception {
        UserDTO userDTO= getCurrentUser();
        if (userDTO!= null &&  (userDTO.getUserPermissionsDTO().getManager() || userDTO.getUserPermissionsDTO().getManageusers())){
            currentSession().saveOrUpdate(userPermissionsDTO);
            return userPermissionsDTO;
        }
        else {
            throw new Exception("You don't have permission " );
        }

    }

    @CacheEvict(value = "userDTO" ,    allEntries = true)
    public void  deleteUserPermission(UserPermissionsDTO userPermissionsDTO) throws Exception {
        UserDTO userDTO= getCurrentUser();
        if (userDTO!= null &&  (userDTO.getUserPermissionsDTO().getManager() || userDTO.getUserPermissionsDTO().getManageusers())){
            currentSession().delete(userPermissionsDTO);
        } else {   throw new Exception("You don't have permission " );  }
    }

    @CacheEvict(value = "userDTO" ,   allEntries = true)
    public OauthidDTO updateOAuthToken(String oAuthToken, UserDTO currentUser){
        OauthidDTO oauthidDTO= (OauthidDTO) getSessionFactory().getCurrentSession()
                .createQuery("from OauthidDTO auth where auth.userDTO.id=:id ").setParameter("id", currentUser.getId())
                .uniqueResult();

        oauthidDTO.setAccess_token(oAuthToken);
        getSessionFactory().getCurrentSession().save(oauthidDTO);
        return  oauthidDTO;
    }

    public OauthidDTO findByProviderAndAccessToken(String providerName , String socialId ){
        return (OauthidDTO) getSessionFactory().getCurrentSession().createQuery("from OauthidDTO oa where oa.provider=:provider and oa.access_token=:socialId ")
                .setParameter("provider", providerName ).setParameter("socialId", socialId).uniqueResult();
    }


    @Cacheable( value = "userDTO" )
    public UserDTO getProjectUserByUsername( Integer projId , String  username){
        return (UserDTO) getSessionFactory().getCurrentSession().createQuery("from UserDTO ud where ud.projid=:projid and  ud.username=:username")
                .setParameter("username", username).setParameter("projid", projId).uniqueResult();
    }

    @Cacheable( value = "userDTO"  )
    @Transactional
    public UserDTO getProjectUserByid( Integer projId , Integer  userid){
        return (UserDTO) getSessionFactory().getCurrentSession().createQuery("from UserDTO ud where ud.projid=:projid and  ud.id=:userid")
                .setParameter("userid", userid).setParameter("projid", projId).uniqueResult();
    }

    @Cacheable( value = "userDTO" )
    public List<UserDTO> getProjectStaff( Integer projId , Integer  limit, boolean cachestaff){
        Criteria criteria = currentSession()
                .createCriteria(UserDTO.class);
        criteria.add(Restrictions.eq("status", 1));
        criteria.add(Restrictions.eq("projid", projId));
        Disjunction or = Restrictions.disjunction();
        or.add(Restrictions.eq("userGrDTO.id", 1));
        or.add(Restrictions.eq("userGrDTO.id", 2));
        criteria.add(or);

        if (limit>0){  criteria.setMaxResults(limit);  }
        return criteria.list();
    }

    @Cacheable( value = "userDTO" )
    public List<UserDTO> getUsersList(Integer projId, Integer type, Integer status, String username , String email , Integer  start, Integer limit, String order ) {
        Criteria criteria = currentSession()
                .createCriteria(UserDTO.class);
        criteria.add(Restrictions.eq("projid", projId));
        if (status != null &&  status == 0) {
            criteria.add(Restrictions.eq("status", status));
        } else {
            criteria.add(Restrictions.eq("status", 1));
        }

        if (type != null && type > -1) {
            criteria.add(Restrictions.eq("usertype", type));
        }
        if (username!= null && !username.isEmpty()) criteria.add(Restrictions.like("name", "%"+username.trim()+"%" ));
        if (email!= null && !email.isEmpty()) criteria.add(Restrictions.like("email", "%"+email.trim()+"%" ));
        if (limit!= null && limit>0) criteria.setMaxResults(limit);
        if (start!= null) criteria.setFirstResult(start);

        if( Objects.equals(order, "bycomment")) { criteria.addOrder(Order.desc("comments"));}
        else if(Objects.equals(order, "byraitings")) {criteria.addOrder(Order.desc("raitings")); }
        else if(Objects.equals(order, "regdate")) { criteria.addOrder(Order.desc("regdate")); }

        return  criteria.list();
    }



//    @Cacheable( value = "userDTO" )
    public UserDTO getCurrentUser(){
        UserDTO userDTO=this.getCurrentLoggedUser();
        if (userDTO== null) throw new AuthenticationServiceException("Not authorised" );
        return  userDTO;
    }

//    @CacheEvict(value = "userDTO" ,   allEntries = true)
    @Transactional
    public UserDTO createAgentUser(Integer projid,  String email){
        UserDTO curuser= getCurrentUser();
        if (curuser.getUserPermissionsDTO().getManager()){
            UserDTO userDTO=getUserByEmail(projid, email );
            if (userDTO== null){userDTO= new UserDTO(email);}
            userDTO.setUsertype(1);
            return saveProfile(userDTO);
        }
        return null;


    }


}
