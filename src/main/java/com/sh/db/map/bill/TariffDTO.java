package com.sh.db.map.bill;

import com.sh.db.map.IntEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Currency;

/**
 * Created by Admin on 15.03.2016.
 */
@Entity
@Table(name = "order",  catalog = "usercare")
public class TariffDTO extends IntEntity{

    private String name;
    private Integer status;
    private Currency price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Currency getPrice() {
        return price;
    }

    public void setPrice(Currency price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "TariffDTO{" +
                "name='" + name + '\'' +
                ", status=" + status +
                ", price=" + price +
                '}';
    }
}
