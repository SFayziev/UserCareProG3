package com.sh.db.map;


import java.io.Serializable;
import java.util.*;

/**
 * Created by shuhrat on 10.10.2015.
 */
public class ItemCount  implements Serializable, Cloneable{
    private static Integer  allkey=-1;
    private static Integer  newkey=0;
    private Integer seltectedArticleType=-1;
    private Integer seltectedArticleStatus=-1;

    public Integer getSeltectedArticleType() {
        return seltectedArticleType;
    }

    public void setSeltectedArticleType(Integer seltectedArticleType) {
        this.seltectedArticleType = seltectedArticleType==null?allkey:seltectedArticleType;
    }

    public Integer getSeltectedArticleStatus() {
        return seltectedArticleStatus;
    }

    public void setSeltectedArticleStatus(Integer seltectedArticleStatus) {
        this.seltectedArticleStatus = seltectedArticleStatus==null? allkey: seltectedArticleStatus;
    }

    public ItemCount() {
        this.itemStatDTOList = new ArrayList<ItemStatDTO>();
    }

    private List<ItemStatDTO> itemStatDTOList;
    Map<Integer,Long> articleStatuscount ;
    Map<Integer,Long> articleTypecount ;

    public List<ItemStatDTO> getItemStatDTOList() {
        return itemStatDTOList;
    }

    public void setItemStatDTOList(List<ItemStatDTO> itemStatDTOList) {
        this.itemStatDTOList = itemStatDTOList;
    }

   public Long getCountByStatus(Integer statusid){
        if(articleStatuscount== null) {recalculateStatus();}
        Long val=articleStatuscount.get(statusid);
        return  val==null?0L:val;
    }
    private void recalculateStatus(){
        articleStatuscount= new HashMap<Integer,Long>();
        articleStatuscount.put(allkey,0L);
        articleStatuscount.put(newkey,0L);
        for(ItemStatDTO itemStatDTO: itemStatDTOList ){
            if (!Objects.equals(seltectedArticleType, allkey) &&  !itemStatDTO.getType().equals(seltectedArticleType) ) continue;
            Long val = articleStatuscount.get(itemStatDTO.getStatus());
            if (val== null){
                articleStatuscount.put(itemStatDTO.getStatus() , itemStatDTO.getCount()) ;
            }
            else{
                articleStatuscount.replace(itemStatDTO.getStatus() , itemStatDTO.getCount()+val);
            }
            Long aval = articleStatuscount.get(allkey);
            if (aval== null){
                articleStatuscount.put(allkey , itemStatDTO.getCount()) ;
            }
            else{
                articleStatuscount.replace(allkey , itemStatDTO.getCount()+aval);
            }
        }
    }


    public Long getCountByType(Integer typeid){
        if(articleTypecount== null) {recalculateType();
        }
        Long val=articleTypecount.get(typeid);
        return  val==null?0L:val;
    }
    private void recalculateType(){
        articleTypecount= new HashMap<Integer,Long>();
        articleTypecount.put(allkey,0L);
        articleTypecount.put(newkey,0L);
        for(ItemStatDTO itemStatDTO: itemStatDTOList ){
            Long val = articleTypecount.get(itemStatDTO.getType());
            if (val== null){
                articleTypecount.put(itemStatDTO.getType(), itemStatDTO.getCount()) ;
            }
            else{
                articleTypecount.replace(itemStatDTO.getType(), itemStatDTO.getCount()+val);
            }
            Long aval = articleTypecount.get(allkey);
            if (aval== null){
                articleTypecount.put(allkey , itemStatDTO.getCount()) ;
            }
            else{
                articleTypecount.replace(allkey , itemStatDTO.getCount()+aval);
            }
        }
    }

   private Long getRowCount(){
       Long count =  getCountByStatus(seltectedArticleStatus== null?allkey:seltectedArticleStatus);
       return count;
   }
}
