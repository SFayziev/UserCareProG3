package com.sh.db.map.bill;

import com.sh.db.map.IntEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by Admin on 15.03.2016.
 */

@Entity
@Table(name = "order",  catalog = "usercare")
public class OrderDTO extends IntEntity {

    private  Integer projid;

    private  Integer  tariffid;
    private  Date date1;
    private  Date date2;
    private  OrderStatus status;

    public OrderDTO() {

    }

    public OrderDTO(Integer projid, Integer tariffid) {
        this.projid = projid;
        this.tariffid = tariffid;
        this.date1= new Date();
        this.status=OrderStatus.Wait;
    }

    public Integer getProjid() {
        return projid;
    }

    public void setProjid(Integer projid) {
        this.projid = projid;
    }

    public Integer getTariffid() {
        return tariffid;
    }

    public void setTariffid(Integer tariffid) {
        this.tariffid = tariffid;
    }

    public Date getDate1() {
        return date1;
    }

    public void setDate1(Date date1) {
        this.date1 = date1;
    }

    public Date getDate2() {
        return date2;
    }

    public void setDate2(Date date2) {
        this.date2 = date2;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "OrderDTO{" +
                "projid=" + projid +
                ", tariffid=" + tariffid +
                ", date1=" + date1 +
                ", date2=" + date2 +
                ", status=" + status +
                '}';
    }
}
