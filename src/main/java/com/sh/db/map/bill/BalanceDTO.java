package com.sh.db.map.bill;

import com.sh.db.map.IntEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Currency;
import java.util.Date;

/**
 * Created by Admin on 15.03.2016.
 */
@Entity
@Table(name = "balance",  catalog = "usercare")
public class BalanceDTO extends IntEntity {
    @NotNull
    private  Integer projid;
    private Date lastinvoice;
    private  Date lastpayment;
    private  Integer  agents=1;
    private BigDecimal balance=BigDecimal.ZERO;

    private BigDecimal usagecharge=BigDecimal.ZERO;

    public BalanceDTO() {

    }

    public BalanceDTO(Integer projid) {
        this.projid = projid;

    }


    public Integer getProjid() {
        return projid;
    }

    public void setProjid(Integer projid) {
        this.projid = projid;
    }

    public Date getLastinvoice() {
        return lastinvoice;
    }

    public void setLastinvoice(Date lastinvoice) {
        this.lastinvoice = lastinvoice;
    }

    public Date getLastpayment() {
        return lastpayment;
    }

    public void setLastpayment(Date lastpayment) {
        this.lastpayment = lastpayment;
    }

    public Integer getAgents() {
        return agents;
    }

    public void setAgents(Integer agents) {
        this.agents = agents;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getUsagecharge() {
        return usagecharge;
    }

    public void setUsagecharge(BigDecimal usagecharge) {
        this.usagecharge = usagecharge;
    }



    @Override
    public String toString() {
        return "BalanceDTO{" +
                "projid=" + projid +
                ", lastinvoice=" + lastinvoice +
                ", lastpayment=" + lastpayment +
                ", agents=" + agents +
                ", balance=" + balance +
                ", usage=" + usagecharge +
                '}';
    }
}
