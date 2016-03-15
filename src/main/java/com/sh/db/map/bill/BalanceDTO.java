package com.sh.db.map.bill;

import com.sh.db.map.IntEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Currency;
import java.util.Date;

/**
 * Created by Admin on 15.03.2016.
 */
@Entity
@Table(name = "balance",  catalog = "usercare")
public class BalanceDTO extends IntEntity {
    private  Integer projid;
    private Date lastinvoice;
    private  Date lastpayment;
    private  Integer  agents;
    private Currency balance;
    private Currency usage;

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

    public Currency getBalance() {
        return balance;
    }

    public void setBalance(Currency balance) {
        this.balance = balance;
    }

    public Currency getUsage() {
        return usage;
    }

    public void setUsage(Currency usage) {
        this.usage = usage;
    }

    @Override
    public String toString() {
        return "BalanceDTO{" +
                "projid=" + projid +
                ", lastinvoice=" + lastinvoice +
                ", lastpayment=" + lastpayment +
                ", agents=" + agents +
                ", balance=" + balance +
                ", usage=" + usage +
                '}';
    }
}
