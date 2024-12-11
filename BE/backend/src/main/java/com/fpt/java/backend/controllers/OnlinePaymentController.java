package com.fpt.java.backend.controllers;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.fpt.java.backend.config.PaymentConfig;

import com.fpt.java.backend.resp.ResponseData;
import com.fpt.java.backend.service.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/payment-online")
@AllArgsConstructor
public class OnlinePaymentController {
    // Hàm gửi thông báo tới client qua SSE
    private final OrderService orderService;

    @GetMapping("/create-payment")
    public ResponseEntity<?> getOnlinePayment(HttpServletRequest req) {
        try {
            String vnp_Version = "2.1.0";
            String vnp_Command = "pay";
            String vnp_OrderInfo = req.getParameter("orderInfor");
            String orderType = "100000";
            String vnp_TxnRef = req.getParameter("orderId");
            String vnp_IpAddr = PaymentConfig.getIpAddress(req);
            String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

            int amount = Integer.parseInt(req.getParameter("total")) * 100;

            Map vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", vnp_Version);
            vnp_Params.put("vnp_Command", vnp_Command);
            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.put("vnp_Amount", String.valueOf(amount));
            vnp_Params.put("vnp_CurrCode", "VND");

            String bank_code = req.getParameter("bankcode");
            if (bank_code != null && !bank_code.isEmpty()) {
                vnp_Params.put("vnp_BankCode", bank_code);
            }
            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
            vnp_Params.put("vnp_OrderType", orderType);

            String locate = req.getParameter("language");
            if (locate != null && !locate.isEmpty()) {
                vnp_Params.put("vnp_Locale", locate);
            } else {
                vnp_Params.put("vnp_Locale", "vn");
            }
            vnp_Params.put("vnp_ReturnUrl", PaymentConfig.vnp_ReturnUrl);
            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());

            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
            cld.add(Calendar.MINUTE, 15);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            // Add Params of 2.1.0 Version
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
            // Billing
            vnp_Params.put("vnp_Bill_Mobile", req.getParameter("txt_billing_mobile"));
            vnp_Params.put("vnp_Bill_Email", req.getParameter("txt_billing_email"));
            String fullName = req.getParameter("txt_billing_fullname");
            if (fullName != null && !fullName.isEmpty()) {
                int idx = fullName.indexOf(' ');
                String firstName = fullName.substring(0, idx);
                String lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
                vnp_Params.put("vnp_Bill_FirstName", firstName);
                vnp_Params.put("vnp_Bill_LastName", lastName);

            }

            vnp_Params.put("vnp_Bill_Address", req.getParameter("txt_inv_addr1"));
            vnp_Params.put("vnp_Bill_City", req.getParameter("txt_bill_city"));
            vnp_Params.put("vnp_Bill_Country", req.getParameter("txt_bill_country"));
            if (req.getParameter("txt_bill_state") != null &&
                    !req.getParameter("txt_bill_state").isEmpty()) {
                vnp_Params.put("vnp_Bill_State", req.getParameter("txt_bill_state"));
            }
            // Invoice
            vnp_Params.put("vnp_Inv_Phone", req.getParameter("txt_inv_mobile"));
            vnp_Params.put("vnp_Inv_Email", req.getParameter("txt_inv_email"));
            vnp_Params.put("vnp_Inv_Customer", req.getParameter("txt_inv_customer"));
            vnp_Params.put("vnp_Inv_Address", req.getParameter("txt_inv_addr1"));
            vnp_Params.put("vnp_Inv_Company", req.getParameter("txt_inv_company"));
            vnp_Params.put("vnp_Inv_Taxcode", req.getParameter("txt_inv_taxcode"));
            vnp_Params.put("vnp_Inv_Type", req.getParameter("cbo_inv_type"));
            // Build data to hash and querystring

            List fieldNames = new ArrayList(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            Iterator itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = (String) itr.next();
                String fieldValue = (String) vnp_Params.get(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    // Build hash data
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue,
                            StandardCharsets.US_ASCII.toString()));
                    query.append(URLEncoder.encode(fieldName,
                            StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue,
                            StandardCharsets.US_ASCII.toString()));

                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }
            String queryUrl = query.toString();
            String vnp_SecureHash = PaymentConfig.generateHMACSHA512(PaymentConfig.vnp_HashSecret,
                    hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;
            System.out.println("P5");

            return ResponseEntity.ok(new ResponseData(true, "Payment created",
                    paymentUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ResponseData(false,
                    e.getMessage(), null));
        }

    }

    @GetMapping("/return-payment")
    public ResponseEntity<?> handlePaymentReturn(HttpServletRequest req) {
        String message;
        String responseCode = req.getParameter("vnp_ResponseCode");
        String orderId = req.getParameter("vnp_TxnRef");
        if ("00".equals(responseCode)) {
            message = "Thanh toán thành công!";
            orderService.updatePaymentById(orderId, true);
        } else {
            message = "Thanh toán thất bại. Mã lỗi: " + responseCode;
            orderService.updatePaymentById(orderId, false);

        }
        System.out.println(message);
        return ResponseEntity.ok(new ResponseData(true, "Payment return",
                message));
    }

}