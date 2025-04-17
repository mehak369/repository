import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DatabaseServlet")
public class DatabaseServlet extends HttpServlet {
    private static final String URL = "jdbc:mysql://localhost:3306/project";
    private static final String USER = "root";
    private static final String PASSWORD = "Shimla369!"; // Change as per your MySQL configuration

    // Use doPost method to handle form submissions
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String action = request.getParameter("action");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);

            if ("insert".equalsIgnoreCase(action)) {
                String insertSQL = "INSERT INTO Users (name, email) VALUES (?, ?)";
                PreparedStatement pstmt = conn.prepareStatement(insertSQL);
                pstmt.setString(1, name);
                pstmt.setString(2, email);
                pstmt.executeUpdate();
                out.println("<h3>User inserted successfully!</h3>");
            } 
            else if ("update".equalsIgnoreCase(action)) {
                String updateSQL = "UPDATE Users SET email=? WHERE name=?";
                PreparedStatement pstmt = conn.prepareStatement(updateSQL);
                pstmt.setString(1, email);
                pstmt.setString(2, name);
                int rowsUpdated = pstmt.executeUpdate();
                if (rowsUpdated > 0)
                    out.println("<h3>User updated successfully!</h3>");
                else
                    out.println("<h3>User not found!</h3>");
            } 
            else if ("delete".equalsIgnoreCase(action)) {
                String deleteSQL = "DELETE FROM Users WHERE name=?";
                PreparedStatement pstmt = conn.prepareStatement(deleteSQL);
                pstmt.setString(1, name);
                int rowsDeleted = pstmt.executeUpdate();
                if (rowsDeleted > 0)
                    out.println("<h3>User deleted successfully!</h3>");
                else
                    out.println("<h3>User not found!</h3>");
            }

            conn.close();
        } catch (ClassNotFoundException | SQLException e) {
            out.println("<h3>Error: " + e.getMessage() + "</h3>");
        }
    

    
    }
}
