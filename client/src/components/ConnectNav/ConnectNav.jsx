import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import {
  getAccountBalance,
  payoutSettings,
  currencyFormatter,
} from "../../store/actions/stripe";

import { Card, Avatar, Badge } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

import moment from "moment";

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;

  const [balance, setBalance] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, [auth]);

  const handlePayoutSettings = async () => {
    setLoading(true);
    try {
      const res = await payoutSettings(token);
      setLoading(false);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Unable to access settings. Try again");
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="available" color="grey">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => {
                    return (
                      <span key={i} className="lead">
                        {currencyFormatter(bp)}
                      </span>
                    );
                  })}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="silver">
              <Card className="bg-light pointer" onClick={handlePayoutSettings}>
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
