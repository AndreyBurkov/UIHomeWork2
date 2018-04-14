import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

public class ServerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        double a = Double.parseDouble(req.getParameter("a"));
        double b = Double.parseDouble(req.getParameter("b"));
        double c = Double.parseDouble(req.getParameter("c"));
        double x1 = 0.0, x2 = 0.0;
        double d = b*b - 4*a*c;
        String message = "OK";
        if (a == 0.0 && b == 0.0) {
            message = "Корней нет";
        } else if (a == 0.0 && b != 0.0) {
            x1 = x2 = -c/b;
        } else if (d < 0.0) {
            message = "Дискриминант d = " + d + " < 0. Действительных корней нет";
        } else if (d == 0.0) {
            x1 = x2 = -b / (2/a);
        } else if (d > 0.0) {
            x1 = (-b + Math.sqrt(d)) / (2*a);
            x2 = (-b - Math.sqrt(d)) / (2*a);
        }

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
        System.out.println(x1 + "     " + x2);

        String result = "{\"message\":\"" + message + "\",\"x1\":\"" + x1 + "\",\"x2\":\"" + x2 + "\"}";
        System.out.println(result);
        resp.setCharacterEncoding("UTF-8");
        PrintWriter writer = resp.getWriter();
        writer.print(result);
    }
}
