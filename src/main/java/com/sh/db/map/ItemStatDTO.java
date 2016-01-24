package com.sh.db.map;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by shuhrat on 10.10.2015.
 */
@Entity
@Table(name = "article",  catalog = "usercare")
public class ItemStatDTO  extends  IntEntity{
    private Integer status;
    private Integer type;
    private Long  count;

    public ItemStatDTO() {

    }

    public ItemStatDTO(Integer status, Integer type, Long count) {
        this.status = status;
        this.type = type;
        this.count = count;
    }

    @Override
    public String toString() {
        return "ItemStatDTO{" +
                "status=" + status +
                ", type=" + type +
                ", count=" + count +
                '}';
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
