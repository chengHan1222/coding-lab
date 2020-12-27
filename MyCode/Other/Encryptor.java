package Other;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encryptor {
	
	private String result;
	
	public Encryptor(String info) {
		try {
			this.result = printResult(encrypt(info));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}
	
	public String getResult() {
		return this.result;
	}
	
	private String printResult(byte[] array) {
		// 保留最後的空格
		String result = "";
		if (array == null) {
			System.out.println("null");
			return null;
		}
		for(byte Element: array) {
			result += Element + " ";
		}
		return result;
	}
	
	private byte[] encrypt(String info) throws NoSuchAlgorithmException {  
	    // 根據 MD5 演算法生成 MessageDigest 物件  
	    MessageDigest md5 = MessageDigest.getInstance("MD5");  
	    byte[] srcBytes = info.getBytes();  
	    // 使用 srcBytes 更新摘要  
	    md5.update(srcBytes);  
	    // 完成哈希計算，得到 result  
	    byte[] resultBytes = md5.digest();  
	    return resultBytes;  
	}

}
